import UserProfile from "../components/user-profile"

export default function Dashboard() {

  return (
    <div className="flex gap-10 justify-around md:w-[1380px] ml-auto mr-auto">
      <div><UserProfile /></div>
      <div className="hidden md:block w-[988px] h-[612px] mt-20 shadow shadow-[#EDEDED]">
        <h1 className="text-3xl font-bold text-center mt-20">داشبورد</h1>
      </div>
    </div>
  )
}
