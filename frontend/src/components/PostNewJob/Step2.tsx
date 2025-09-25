
'use client'
import { Chip, GridLegacy as Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"
import { PostNewJob } from "@/types/PostNewJob"
import { getItem, setItem } from "@/lib/storage"

type Skill = {id: number, name: string, clicked: boolean}

const skills: Skill[] = [
  { id: 1, name: "React", clicked: false },
  { id: 2, name: "Node.js", clicked: false },
  { id: 3, name: "Python", clicked: false },
  { id: 4, name: "JavaScript", clicked: false },
  { id: 5, name: "TypeScript", clicked: false },
  { id: 6, name: "PHP", clicked: false },
  { id: 7, name: "Java", clicked: false },
  { id: 8, name: "Adobe Photoshop", clicked: false },
  { id: 9, name: "Figma", clicked: false },
  { id: 10, name: "Illustrator", clicked: false },
  { id: 11, name: "UI/UX Design", clicked: false },
  { id: 12, name: "Arabic Translation", clicked: false },
  { id: 13, name: "English Writing", clicked: false },
  { id: 14, name: "Content Writing", clicked: false },
  { id: 15, name: "SEO", clicked: false },
  { id: 16, name: "Social Media Marketing", clicked: false },
  { id: 17, name: "Digital Marketing", clicked: false }
]

//Skills
export const Step2 = () => {
    const {errors, touched, setFieldValue} = useFormikContext<PostNewJob>()
    const [data, setData] = useState(getItem('skills')?? skills) 
    const handleClick = (id: number) => {
        setData(old =>
            old.map(x => 
                x.id === id ? {...x, clicked: !x.clicked} : x
            )
        )
    }
    useEffect(()=> {
        const clickedSkills = data.filter(skill => skill.clicked == true).map(skill => skill.id)
        setFieldValue('skills', clickedSkills)
        setItem<Skill[]>('skills', data) //when go to another step, clicked skills removed, so i save it to localsotrage
    }, [data, setFieldValue])
    return(
        <>
            <Grid container spacing={1}>
                {data.map(skill =>
                    <Grid key={`skill-${skill.id}`} item xs={12} sm={6} md={4}>
                        <Chip
                            label={skill.name}
                            sx={{
                                bgcolor: skill.clicked ? '#006633' : 'white',
                                border: '1px solid #E5E7EB',
                                color: skill.clicked ? 'white' : '',
                                width: '100%'
                            }}
                            onClick={()=> handleClick(skill.id)}
                        />
                    </Grid>
                )}
            </Grid>
            {
                touched.skills && errors.skills &&
                <Typography mt={1} ml={1} fontSize={'small'} color="error">{errors.skills}</Typography>
            }
        </>
    )
}