import HomeContainter from "../../containers/HomeContainter"
import InfoInput from "./components/InfoInput"
import PrivateInfoInput from "./components/PrivateInfoInput"
import ProfileImage from "./components/ProfileImage"

const HomePage = () => {
  return (
    <HomeContainter>
      <ProfileImage />
      <InfoInput />
      <PrivateInfoInput />
    </HomeContainter>
  )
}

export default HomePage