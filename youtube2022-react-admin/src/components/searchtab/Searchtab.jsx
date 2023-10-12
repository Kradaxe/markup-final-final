import React from 'react'
import "./searchtab.scss"

export const Searchtab = () => {
  return (
    <div className='searchtab'>

        <div className='search'>
                <div >

                        <input
                        type="text"
                        placeholder="Search..."
                        value=""
                        onChange=""
                      />
                      <button>Search</button>

              </div>

                or

        <button className='upload'>Upload</button>

        </div>

        <div className='invite'>

            <button>Invite</button> 
              
        </div>
        
    </div>  
  )
}