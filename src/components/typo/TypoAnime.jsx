import React from 'react'
import { TypeAnimation } from 'react-type-animation';
const TypoAnime = () => {
  return (
       <TypeAnimation
      sequence={[
        'cryptocurrencies',
        1000, 
        'foreign exchange',
        1000,
        'copy trading',
        1000,
        'stocks $ ETFs',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ display: 'block',fontFamily:"poppins",color:'rgb(230, 184, 11)', fontWeight:400 }}
      repeat={Infinity}
    />
  )
}

export default TypoAnime