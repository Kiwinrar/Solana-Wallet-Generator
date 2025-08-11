interface inputType{
  seedArray: string | null
}
export const SinglePharseContainerComponent=(props:inputType)=>{
  return(
    <>
      <div className="flex justify-center text-white opacity-65 text-lg items-center h-20 w-full bg-gray-800 rounded-md">{props.seedArray }</div>
    </>
  )
}