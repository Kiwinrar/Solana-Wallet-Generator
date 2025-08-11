import { SinglePharseContainerComponent } from "./SinglePharseContainer"

interface inputType{
  seed: string | null,
  seedArray: string[] | null 
}
export const SeedPharseContainerComponent=(props: inputType)=>{
  console.log(props.seedArray)
  return(
    <>
      <div className="flex-1 my-4 mx-6">
        <div className="flex gap-4 w-full">
          <SinglePharseContainerComponent seedArray={props.seedArray!=null? props.seedArray[0]:null}/>
          <SinglePharseContainerComponent seedArray={props.seedArray!=null? props.seedArray[1]:null}/>
          <SinglePharseContainerComponent seedArray={props.seedArray!=null? props.seedArray[2]:null}/>
          <SinglePharseContainerComponent seedArray={props.seedArray!=null? props.seedArray[3]:null}/>
        </div>
      </div>
    </>
  )
}