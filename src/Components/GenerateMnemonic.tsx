import { ArrowDownComponent } from "../ui/icons/ArrowDown"
import { ArrowUpComponent } from "../ui/icons/ArrowUp"
import { AddWalletComponent } from "./AddWallet"
import { type WalletItem } from "./AddWallet"
interface inputType {
  onClick: () => void,
  isMnemonicNull: boolean,
  seedString: string | null,
  isMnemonicVisible: boolean,
  setIsMnemonicVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isWalletNo: number,
  setIsWalletNo: React.Dispatch<React.SetStateAction<number>>,
  setIsContent: React.Dispatch<React.SetStateAction<WalletItem[]>>
}
const isDisabledStyles={
  "false": 'bg-gray-800 cursor-not-allowed',
  "true": 'bg-red-800 cursor-pointer hover:scale-103'
}
export const GenerateMnemonicComponent=(props:inputType)=>{
  return(
    <>
      <div className="flex justify-center items-center gap-4">
        {props.isMnemonicNull ? null : <AddWalletComponent setIsContent={props.setIsContent} setIsWalletNo={props.setIsWalletNo} isWalletNo={props.isWalletNo} seedString={props.seedString}/>} 
        <button disabled={!props.isMnemonicNull} onClick={props.onClick} className={`${props.isMnemonicNull?isDisabledStyles["true"]:isDisabledStyles["false"]} text-white px-4 py-4 rounded-lg`}>Generate Seed</button>
        {props.seedString!=null?
          <div className="text-white" onClick={()=>{
            props.setIsMnemonicVisible(c=>!c)
          }}>{props.isMnemonicVisible? <ArrowUpComponent/>:<ArrowDownComponent/>}</div>:null
        }
      </div>
    </>
  )
} 