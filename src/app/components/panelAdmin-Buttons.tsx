"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

function PanelAdminButtons() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-gray-100 shadow hover:bg-gray-200 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:block w-[306px] h-[700px] shadow shadow-[#d3d2d2]">
        <SidebarContent />
      </div>

      <div
        className={`fixed md:hidden top-0 right-0 h-full w-[250px] bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)}>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-10 flex-1">
            <SidebarContent />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

function SidebarContent() {
  return (
    <div className="flex flex-col gap-6 text-[#9197B3]">
      <Link href="/panelAdmin" className="flex gap-2 mt-10 hover:text-black mr-5">
        <Image src="/panelAdmin/key-square.png" width={24} height={24} alt="logo" />
        <h3>پنل ادمین</h3>
      </Link>

      <Link href="/panelAdmin" className="flex gap-2 mt-3 hover:text-black mr-5">
        <Image src="/panelAdmin/icons8-user-24.png" width={24} height={24} alt="logo" />
        <h3>اعضا / مشتریان</h3>
      </Link>

      <Link href="/panelAdmin/shops" className="flex mt-3 gap-2 hover:text-black mr-5">
        <Image src="/panelAdmin/shop.png" width={24} height={24} alt="logo" />
        <h3>خرید ها</h3>
      </Link>

      <Link href="/panelAdmin/add-product" className="flex mt-3 gap-2 hover:text-black mr-5">
        <Image src="/panelAdmin/3d-square 1-products.png" width={24} height={24} alt="logo" />
        <h3>اضافه کردن محصول</h3>
      </Link>

      <Link href="/panelAdmin/add-article" className="flex mt-3 gap-2 hover:text-black mr-5">
        <Image src="/panelAdmin/icons8-article-50.png" width={24} height={24} alt="logo" />
        <h3>اضافه کردن مقاله</h3>
      </Link>

      <Link
        href="/login"
        className="flex gap-2 mt-80  hover:text-red-700 mr-5"
      >
        <Image src="/panelAdmin/icons8-log-out-50.png" width={24} height={24} alt="logo" />
        <h3>خروج از حساب</h3>
      </Link>
    </div>
  )
}

export default PanelAdminButtons
