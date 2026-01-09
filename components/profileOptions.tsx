import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import React, {  useState, useEffect } from "react";
import { authClient, type Session } from "@/lib/auth-client"
import{
  IconSettings,
  IconLogin2,
} from "@tabler/icons-react";
interface profileOptions {
  session : Session; 
}
export default function ProfileOptions({session}:profileOptions){


  useEffect(() => {
    console.log("here in profileOptions")
    console.log(session)
  }, [session])
  

  return<>
<Popover>
      <PopoverTrigger asChild>

<Avatar className=" h-12 w-12">
            {session.user.image!==""&&session.user.image?
        <AvatarImage src={session.user.image} alt="@shadcn" size={20}/>

        :
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>}
      </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-40">
          <div className="grid gap-2">
             <Button>Settings <IconSettings/></Button> 
             <Button onClick={async()=>{await authClient.signOut();}}>Logout <IconLogin2/></Button> 
          </div>
      </PopoverContent>
    </Popover>
  </>
}
