const JPhotoDisplay = ( () => {
  const createArrow = (direction) => {
    const arrow = document.createElement('div')
    arrow.classList.add('jphoto-arrow')
    arrow.innerHTML =
      `
      <div class="jphoto-inner-arrow jphoto-inner-${direction}-arrow">
      </div>
      `
    arrow.classList.add(`jphoto-${direction}-arrow`)
    return arrow
  }
  const leftArrow = () => {
    return createArrow('left')
  }
  const rightArrow = () => {
    return createArrow('right')
  }
  return {
    leftArrow,
    rightArrow

  }
})()

const JPhoto = (() => {
  let moveTimer = null;
  let currentPosition = 0;
  const getNumPhotos = (element) => element.children.length
  const getBaseWidth = (element) => parseInt(element.parentNode.offsetWidth)


  const setWidth = (element) => {
    element.style.width = `${getBaseWidth(element) * getNumPhotos(element)}px`
    element.style['grid-template-columns'] = `repeat(${getNumPhotos(element)},
      ${getBaseWidth(element)}px)`
  }
  const setHeight = (element) => {
    const baseHeight = element.parentNode.offsetHeight
    element.style.height = `${baseHeight}px`
    Array.from(element.children).forEach((child) => {
      child.style.height = `${baseHeight}px`
    })
  }

  const assignPosition = (element, position) => {
    if (moveTimer) window.clearTimeout(moveTimer);
    element.style.left = `${-(getBaseWidth(element) * position)}px`
    currentPosition = position
    moveTimer = setTimeout(() => {moveRight(element)},1000)
  }
  const moveRight = (element) => {

    if (currentPosition < getNumPhotos(element)-1) {
      assignPosition(element, currentPosition + 1)
    } else {
      assignPosition(element, 0)
    }

  }
  const moveLeft = (element) => {
    if (currentPosition > 0) {
      assignPosition(element, currentPosition - 1)
    } else {
      assignPosition(element, getNumPhotos(element)-1)
    }

  }

  const addArrows = (image) => {
    const leftArrow = JPhotoDisplay.leftArrow()
    leftArrow.addEventListener('click', (event) => {
      moveLeft(event.currentTarget.parentNode.parentNode)
    })
    image.appendChild(leftArrow)
    const rightArrow = JPhotoDisplay.rightArrow()
    rightArrow.addEventListener('click', (event) => {
      moveRight(event.currentTarget.parentNode.parentNode)
    })
    image.appendChild(rightArrow)

  }

  const setupImages = (element) => {
    Array.from(element.children).forEach((image) => {
      addArrows(image)
    })
  }

  const setup = (element) => {
    element.style.position = "absolute"
    setWidth(element)
    setHeight(element)
    assignPosition(element,currentPosition)
    moveTimer = setTimeout(() => {moveRight(element)},1000)
    setupImages(element)
  }
  const setupAll = () => {
    Array.from(document.getElementsByClassName('jphoto-carousel')).forEach(
      (element) => {
        setup(element)
      }
    )
  }
  return {
    setupAll,
    moveLeft,
    moveRight
  }
})()
JPhoto.setupAll()
