"use clilent"
import { Typography } from "@mui/material"
import Link from "next/link"
import { auth } from "../../auth"

const Header =  async()=> {
    const session = await auth();

    return(
        <header className="flex justify-between py-4  align-center px-5 md:px-[128px] lg:px-[228px]">
            <div>
                <div className="flex items-center gap-2">
                    <Typography 
                     width={'40px'}
                     height={'40px'}
                     textAlign={'center'}
                     variant="h6"
                     fontSize="12px"
                     lineHeight={3}
                     borderRadius={4}
                     fontWeight={'bold'}
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     marginBottom={1}
                     sx={{
                         color: 'white',
                         background: 'linear-gradient(to bottom right, #006633, #00663380)'
                     }}
                >
                    <Typography>
                        W
                    </Typography>
                </Typography>
                    <Typography 
                    variant="h1"
                    fontSize="16px"
                    lineHeight="24px"
                    fontWeight="700"
                    sx={{color: '#006633'}}
                >
                    Wasla
                </Typography>
                </div>
            </div>
            <div className='flex gap-1 items-center'>
          {!session?.user ?  <Link
            href="/auth"
                            type="button"
                            className={'hidden  cursor-pointer px-5 md:flex py-2 border border-transparent font-medium rounded-xl bg-transparent text-[#1a1a1a] hover:bg-gray-100 hover:text-[#1a1a1a] focus:outline-none focus:ring-2 disabled:opacity-50 leading-[1.2]' }
                        >
                            Sign In
                        </Link> :      <Link href="/auth" className="flex-shrink-0 w-10 h-10 rounded-full bg-[#006633] flex items-center justify-center text-white text-sm font-bold">
            {(session?.user?.name as string)
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </Link>}
                        {/* <button
                            type="button"
                            className={`cursor-pointer px-5 flex py-2 border border-transparent font-medium rounded-2xl bg-[#006633] text-white hover:bg-[#006633] hover:text-white focus:outline-none focus:ring-[2px] disabled:opacity-50 leading-[1.2]`}
                        >
                            Get Started
                        </button> */}
                       
                    </div>
        </header>
    )
} 

export default Header