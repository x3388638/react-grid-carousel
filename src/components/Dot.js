import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DotWrapper = styled.div`
  display: flex;
  margin: 0 5px;
  cursor: pointer;
`

const DotDefault = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

const Dot = ({
  index,
  isActive = false,
  dotColorInactive,
  dotColorActive,
  dot: DotCustom,
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick(index)
  }, [index, onClick])

  return (
    <DotWrapper onClick={handleClick}>
      {DotCustom ? (
        <DotCustom isActive={isActive} />
      ) : (
        <DotDefault color={isActive ? dotColorActive : dotColorInactive} />
      )}
    </DotWrapper>
  )
}

Dot.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  dotColorInactive: PropTypes.string,
  dotColorActive: PropTypes.string,
  dot: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType
  ]),
  onClick: PropTypes.func.isRequired
}

export default Dot
