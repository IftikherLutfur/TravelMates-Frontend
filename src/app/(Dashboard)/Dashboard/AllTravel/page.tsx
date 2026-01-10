import AllTravelPlanForAdmin from "@/components/AdminDashBoard/AllTravelPlanForAdmin";
import axios from "axios";

const AllTravel = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/travel`)
    return (
        <div>
          Hereis all travel 
          <AllTravelPlanForAdmin travels={res.data.data}/> 
        </div>
    );
};

export default AllTravel;