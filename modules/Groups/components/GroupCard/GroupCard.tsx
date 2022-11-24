import {Box, Typography} from "@mui/material";
import GroupCardItem from "../GroupCardItem/GroupCardItem";
import {TeamI} from "../../../../interfaces/team";

type Props = {
    groupTitle?: string,
    groupData: TeamI[]
}

const GroupCard = ({groupTitle, groupData}: Props) => {
    return (
        <Box sx={{backgroundColor: 'white', borderRadius: '1rem', padding: '1rem'}}>
            <Typography variant={'subtitle2'}
                        textAlign={'center'}
                        mb={'1rem'}
            >
                Group {groupTitle}
            </Typography>
            {
                groupData.map((team: TeamI, index) => {
                    return <GroupCardItem order={`${groupTitle} ${index + 1}`}
                                          logoUrl={team.flag}
                                          key={team._id}
                                          teamName={team.name_en}/>

                })
            }
        </Box>
    );
};

export default GroupCard;