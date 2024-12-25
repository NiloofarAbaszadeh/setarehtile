import React from "react"
import Inventory from "./Inventory"
import { Link, redirect } from "react-router-dom"

export const UploadInventoryLoader = () => {
    if (localStorage.getItem("userRole") !== "فروش") {
      alert("شما اجازه دسترسی به این صفحه را ندارید.")
      return redirect("/dashboard")
    }
    return null
  }

const UploadInventory = () => {
    return <div className="mx-12">
    <div className="flex items-center justify-end mx-12">
        <Link to={`./upload`}><button className="button-custom bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto mt-0">افزودن</button></Link>
    </div>
    <Inventory />
    </div>
}

export default UploadInventory