import React from 'react'
import Image from 'next/image'

function PanelAdminHeader() {
  return (
    <div>
      <div className='flex justify-around items-center text-center w-[968px] h-[151px] shadow shadow-[#d3d2d2]'>
        <div className='flex justify-center items-center text-center gap-5'>
          <Image src="/panelAdmin/image-panel-admin-user-1.png" width={84} height={84} alt='image'></Image>
          <div>
            <h3 className='text-[#ACACAC]'>کاربران فعال</h3>
            <p className='pt-2 font-bold'>16</p>
          </div>
        </div>
        <div className='flex justify-center items-center text-center gap-5'>
          <Image src="/panelAdmin/image-panel-admin-user-2.png" width={84} height={84} alt='image'></Image>
          <div>
            <h3 className='text-[#ACACAC]'>اعضا</h3>
            <p className='pt-2 font-bold'>59</p>
          </div>
        </div>
        <div className='flex justify-center items-center text-center gap-5'>
          <Image src="/panelAdmin/image-panel-admin-user-3.png" width={84} height={84} alt='image'></Image>
          <div>
            <h3 className='text-[#ACACAC]'>مشتریان</h3>
            <p className='pt-2 font-bold'>367</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelAdminHeader