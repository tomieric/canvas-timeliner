export interface IOptions {
  container: HTMLElement; // 容器
  position: string; // 位置
  textPos: string; // 刻度位置
  textAlign: string; // 文字对齐
  gap: number;
  lineOffset: number;
  gapHeight: number;
  gapColor: number;
  lineColor: string; // 标线颜色
  lineWidth: number;
  lineHeight: number;
  interval: number;
  textFont: string;
  textStyle: string;
  formatMarkText: (mark: number | string) => string;
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
    this.options = options

    this.setRect()
    this.render()
    this.draw()
    this.resizeObserve()
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
    const { canvas, container } = this
    const boundRect: ClientRect = container.getBoundingClientRect()

    ;(canvas as any).width = this.width = boundRect.width
    if (!isResize) (canvas as any).height = this.height = boundRect.height || 100
  }

  draw (options?: IOptions) {
    if (options) this.setOption(options)

    this.steps = Math.round(this.width / this.options.gap)
    this.ctx.clearRect(0, 0, this.width, this.height)
    // 绘制长线
    this.drawLine(0, this.height, this.width, this.height)
    // 绘制刻线
    this.drawMark()
  }

  drawLine (x: number, y: number, endX: number, endY: number) {
    const ctx = this.ctx
    const { lineColor, lineWidth } = this.options
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = lineColor || 'rgb(0, 0, 0)'
    ctx.lineWidth = lineWidth || 1
    ctx.stroke()
  }

  drawText (text: string | number, x: number, y: number) {
    const { ctx, options } = this
    const { textStyle, textFont } = options
    ctx.fillText(text as string, x, y)
    ctx.font = textFont || '10'
    ctx.fillStyle = textStyle || '#000000'
  }

  private drawMark () {
    const { lineHeight, gapHeight, gap, interval, formatMarkText } = this.options
    let isGap: boolean = false
    let isGapText: boolean = false
    let [x, y, textY] = [0, 0, 0]
    let text: string | number;
    const val = interval || 10
    const g = gap || 10

    for (let i = 0; i < this.steps; i++) {
      isGap = i > 0 ? !(i % val) : !1
      isGapText = isGap || i === 0
      x = g * i + 0.5
      y = this.height - (isGap ? gapHeight || 20 : lineHeight || 10) + 0.5
      textY = this.height - (gapHeight || 20) + 0.5 - 5
      // + 0.5 解决 1px 模糊
      this.drawLine(
        x,
        y,
        x,
        this.height + 0.5
      )

      text = formatMarkText ? formatMarkText(i) : i

      isGapText && this.drawText(
        text,
        x,
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
