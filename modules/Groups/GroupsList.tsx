import GroupCard from "./components/GroupCard/GroupCard";
import Grid2 from "@mui/material/Unstable_Grid2";


const GroupsList = ({groups}: { groups: Object }) => {
    const groupId = Object.keys(groups).sort()
    const groupedTeams: (((v: Object) => boolean) | ((v: PropertyKey) => boolean) | (() => Object) | Function | (() => string))[] = groupId.map((id, index) => {
        return groups[id as keyof typeof groups]
    })

    return (
        <Grid2 container
               spacing={3}
               margin={0}
               py={'2rem'}>

            {
                groupedTeams.map((group: any, index) => {
                    return <Grid2 xs={12}
                                  key={index}
                                  md={3}>
                        <GroupCard groupData={group}
                                   groupTitle={group[0].groups}/>
                    </Grid2>
                })
            }
        </Grid2>
    );
};


export default GroupsList;