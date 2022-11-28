import {Box, Container, Paper, Typography} from "@mui/material";
import HomeContent from "../modules/Home/HomeContent";
import SeoTitle from "../components/SeoTitle/SeoTitle";
import {StandingGroupI} from "../interfaces/standingTable";
import StandingTable from "../modules/Standings/components/standingTable/StandingTable";

export default function Home() {
  return (
    <>
        <SeoTitle siteName={"Fifa world cup"}
                  title={`Home`}/>
        <HomeContent />
    </>
  )
}
