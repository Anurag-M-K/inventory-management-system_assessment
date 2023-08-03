import React from 'react'
import './Spinner.css'

function Spinner() {
  return (
<div class=" spinner h-[100vh] flex items-center justify-center z-9999 text-black">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  )
}

export default Spinner