import CoverPhoto from "../../components/CoverPhoto";
import NewArrival from "../newArrivalPage";
import Categories from "../categorySection"

import StoreVisit from "../storevisit";
import NewsLetter from "../NewsLetter";


const Homepage = () => {

  return (
    <div>
      <CoverPhoto/>
      <NewArrival/>
      <Categories/>
      <StoreVisit/>
      <NewsLetter/>
    </div>
  )
}

export default Homepage
