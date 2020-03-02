export interface IOptions {
  container: HTMLElement; // 容器
  position: string; // 位置
  textPos: number; // 刻度位置
  textAlign: string; // 文字对齐
  gap: number;
  width: number;
  height: number;
  lineOffset: number;
  gapHeight: number;
  gapColor: number;
  lineColor: string; // 标线颜色
  lineWidth: number;
  lineHeight: number;
  interval: number;
  textSize: string;
  textStyle: string;
  formatMarkText: (mark: number | string) => string;
}

const DEFAULT_OPTIONS: object = {
  height: 100,
  textSize: 10,
  interval: 10,
  gap: 10,
  textPos: 5,
  gapHeight: 20,
  lineHeight: 10,
  lineWidth: 1,
  lineColor: 'rgb(0, 0, 0)',
  textStyle: '#000000'
}

export default class TimeLiner {
  public canvas: HTMLElement;
  public container: HTMLElement;
  public ctx: CanvasRenderingContext2D;
  public options: IOptions;
  public width: number;
  public height: number;
  public steps: number; // 刻度数

  constructor (options: IOptions) {
    const canvas = document.createElement('canvas')
    const { container } = options

    if (!container) {
      console.warn('container must be to set')
      return
    }
    
    this.canvas = canvas
    this.container = container
    this.ctx = canvas.getContext('2d')
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)

    this.setRect()
    this.render()
    this.draw()
    // this.resizeObserve()
  }

  render (dom?: HTMLElement) {
    const el = (dom || this.container)
    if (el) {
      el.appendChild(this.canvas)
    } else {
      console.log('container must be to set')
    }
  }

  setRect (isResize?: boolean) {
    const { canvas, container, options } = this
    const { width, height } = options
    const boundRect: ClientRect = container.getBoundingClientRect()

    ;(canvas as any).width = this.width = boundRect.width || width
    if (!isResize) (canvas as any).height = this.height = boundRect.height || height
  }

  draw (options?: IOptions) {
    if (options) this.setOption(options)
    let total = this.width
    const { position, interval } = this.options

    if (/left|right/.test(position)) {
      total = this.height
    }

    this.steps = Math.round(total / interval)
    this.ctx.clearRect(0, 0, this.width, this.height)
    // 绘制长线
    this.drawBorderLine()
    // 绘制刻线
    this.drawMark()
  }

  drawBorderLine () {
    const { position } = this.options
    let [x, y, x1, y1] = [0, 0, this.width, this.height]
    switch (position) {
      case 'bottom':
        x = 0
        y = this.height
        break
      case 'left':
        x1 = 0
        break
      case 'right':
        x = this.width
        break
      case 'top':
      default:
        y = 0
        y1 = 0
        break
    }
    this.drawLine(x, y, x1, y1)
  }

  drawLine (x: number, y: number, endX: number, endY: number) {
    const ctx = this.ctx
    const { lineColor, lineWidth } = this.options
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  drawText (text: string | number, x: number, y: number) {
    const { ctx, options } = this
    const { textStyle, textSize } = options
    ctx.fillText(text as string, x, y)
    ctx.font = textSize
    ctx.fillStyle = textStyle
  }

  private drawMark () {
    const { lineHeight, gapHeight, gap, interval, formatMarkText, position, textSize, textPos } = this.options
    let isGap: boolean = false
    let isGapText: boolean = false
    let text: string | number;
    const fontSize = Number(textSize)

    // + 0.5 解决 1px 模糊
    const getXY = (num: number) => {
      let [x, y, x1, y1, textX, textY] = [0, 0, 0, 0, 0, 0]

      switch (position) {
        case 'left':
            x = 0
            x1 = (isGap ? gapHeight : lineHeight) + 0.5
            y = y1 = (isGap ? gapHeight : lineHeight) * num + 0.5
            textX = (isGap ? gapHeight : lineHeight) + textPos + 0.5
            textY = y + fontSize / 2
          break
        case 'right':
            x = this.width - (isGap ? gapHeight : lineHeight) + 0.5
            x1 = this.width
            y = y1 = (isGap ? gapHeight : lineHeight) * num + 0.5
          break
        case 'bottom':
            x = x1 = interval * num + 0.5
            y = this.height - (isGap ? gapHeight : lineHeight) + 0.5
            y1 = this.height
            textX = x
            textY = this.height - (gapHeight) + 0.5 - textPos
          break;
        case 'top':
        default:
            x = x1 = interval * num + 0.5
            y = 0
            y1 = (isGap ? gapHeight : lineHeight) + 0.5
            textX = x
            textY = gapHeight + 0.5 + fontSize + textPos
          break;
      }

      return { x, y, x1, y1, textX, textY }
    }

    for (let i = 0; i < this.steps; i++) {
      isGap = i > 0 ? !(i % gap) : !1
      isGapText = isGap || i === 0
      const { x, y, x1, y1, textX, textY } = getXY(i)
      
      this.drawLine(x, y, x1, y1)

      text = formatMarkText ? formatMarkText(i) : i

      isGapText && this.drawText(
        text,
        textX,
        textY
      )
    }
  }

  setOption (options: IOptions) {
    this.options = Object.assign(this.options, options)
  }

  private resizeObserve() {
    if ((window as any).ResizeObserver) {
      const resizeObserver = new (window as any).ResizeObserver((entries: HTMLElement[]) => {
        for (let entry of entries) {
          if (this.width !== (entry as any).contentRect.width) {
            this.setRect(true)
          }
          this.draw()
        }
      })
      resizeObserver.observe && resizeObserver.observe(this.container)
    }
  }
}
