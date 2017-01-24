const React = require("react")
const classes = require("./classes")

const $ = React.createElement

class ScrollHelper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTop: false,
      isBottom: false,
    }
    this.scrollListener = this.scrollListener.bind(this)
  }
  scrollListener() {
    const {innerHeight, pageYOffset} = window
    const {scrollTop, offsetHeight} = document.body
    const isTop = scrollTop === 0
    const isBottom = (innerHeight + pageYOffset) >= offsetHeight
    if (isTop !== this.state.isTop || isBottom !== this.state.isBottom) {
      this.setState({isTop, isBottom})
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scrollListener, false)
    window.setTimeout(() => this.scrollListener(), 0)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener)
  }
  render() {
    const {isTop, isBottom} = this.state
    const shouldHide = isTop || isBottom
    const src = "top.svg"
    const size = 24
    const onClick = () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
    const img = $("img", {src, width: size, height: size})
    const className = classes(
      "GoToTop",
      {"o-0": shouldHide}
    )
    return $("a", {onClick, className, href: "#"}, img)
  }
}

module.exports = ScrollHelper