import { useState } from "react";
import { GenerateMnemonicComponent } from "./Components/GenerateMnemonic";
import { SeedPharseContainerComponent } from "./Components/SeedPharseContainer";
import { generateMnemonic } from "bip39";
import "./App.css";
import { ClipboardComponent } from "./ui/icons/Clipboard";
import { EyeOpenComponent } from "./ui/icons/EyeOpen";
import { EyeClosedComponent } from "./ui/icons/EyeClosed";
import { DeleteComponent } from "./ui/icons/Delete";
import { type WalletItem } from "./Components/AddWallet";
import { ShowEventCopiedComponent } from "./Components/ShowEventCopied";
function App() {
  const [isMnemonic, setIsMnemonic] = useState<string | null>(null);
  const [isMnemonicVisible, setIsMnemonicVisible] = useState(true);
  const [is1stSubArray, setIs1stSubArray] = useState<string[] | null>(null);
  const [is2ndSubArray, setIs2ndSubArray] = useState<string[] | null>(null);
  const [is3rdSubArray, setIs3rdSubArray] = useState<string[] | null>(null);
  const [isWalletNo, setIsWalletNo] = useState(1);
  const [isContent, setIsContent] = useState<WalletItem[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState<{ [key: number]: boolean }>({});
  const isMnemonicNull: boolean = isMnemonic == null ? true : false;
  console.log(isMnemonicNull);
  const GenerateMnemonic = () => {
    if (isMnemonicNull) {
      const seedPharse = generateMnemonic(128);
      setIsMnemonic(seedPharse);
      const seed1 = Array.from(seedPharse.split(" "));
      const subarray1: string[] = [];
      const subarray2: string[] = [];
      const subarray3: string[] = [];
      for (let i = 0; i < seed1.length; i++) {
        if (i < 4 && i >= 0) {
          subarray1.push(seed1[i]);
        } else if (i < 8 && i >= 4) {
          subarray2.push(seed1[i]);
        } else {
          subarray3.push(seed1[i]);
        }
      }
      setIs1stSubArray(subarray1);
      setIs2ndSubArray(subarray2);
      setIs3rdSubArray(subarray3);
    }
  };
  return (
    <div className="min-h-screen min-w-full bg-gray-900">
      <div className="flex items-center justify-center py-10">
        <h1 className="text-white text-4xl font-extrabold">Your Wallet</h1>
      </div>
      <div className="h-fit w-full pt-10 px-20 pb-20">
        <div className="h-fit w-full border-gray-700 border-b border-l border-r border-t rounded-lg">
          <div className="flex justify-between items-center mx-8 my-6">
            <h1 className="text-2xl font-bold text-white">
              Your Secret Pharse
            </h1>
            <div className="flex">
              <GenerateMnemonicComponent
                isMnemonicNull={isMnemonicNull}
                onClick={GenerateMnemonic}
                seedString={isMnemonic}
                setIsMnemonicVisible={setIsMnemonicVisible}
                isMnemonicVisible={isMnemonicVisible}
                isWalletNo={isWalletNo}
                setIsWalletNo={setIsWalletNo}
                setIsContent={setIsContent}
              />
            </div>
          </div>
          {isMnemonicNull ? null : (
            <div
              className={`px-2 pt-4 pb-10 ${isMnemonicVisible ? "" : "hidden"}`}
              onClick={() => {
                if (isMnemonic) {
                  navigator.clipboard.writeText(isMnemonic);
                  alert("The seed is successfully copied");
                }
              }}
            >
              <SeedPharseContainerComponent
                seed={isMnemonic}
                seedArray={is1stSubArray}
              />
              <SeedPharseContainerComponent
                seed={isMnemonic}
                seedArray={is2ndSubArray}
              />
              <SeedPharseContainerComponent
                seed={isMnemonic}
                seedArray={is3rdSubArray}
              />
              <div className="flex items-center gap-2 text-white opacity-45 px-8">
                <ClipboardComponent />
                <h1>Click Anywhere To Copy</h1>
              </div>
            </div>
          )}
        </div>
        {Array.isArray(isContent) &&
          isContent.length > 0 &&
          isContent.map(({ publicKey, privateKey, walletNo}, index) => (
            <div
              id={index.toString()}
              className="px-10 py-10 my-14 h-fit w-full border-gray-700 border-b border-l border-r border-t rounded-lg text-white "
            >
              <div className="absolute">
                <h1 className="text-5xl font-bold">Wallet {walletNo}</h1>
              </div>
              <div className="relative flex justify-end text-red-700">
                <DeleteComponent />
              </div>
              <div className="mt-12">
                <h1 className="text-2xl pb-2">Public Key</h1>
                <div onClick={()=>{
                  navigator.clipboard.writeText(publicKey);
                  return (<ShowEventCopiedComponent/>)
                }} className="text-lg text-gray-400 flex flex-wrap break-all px-2 hover:text-gray-200 ease-in-out transition-all">
                  {publicKey}
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl pb-2">PrivateKey</h1>
                <div className="relative flex justify-end items-center">
                  <div id={`passwordBox${index}`}
                    className="absolute px-4"
                    onClick={() => {
                      setIsPasswordVisible((c) => ({...c, [index]:!c[index]}));
                    }}
                  >
                    {isPasswordVisible[index] ? (
                      <EyeClosedComponent />
                    ) : (
                      <EyeOpenComponent />
                    )}
                  </div>
                  <input
                    value={privateKey}
                    className="text-lg select-all text-gray-200 px-4 py-2 bg-gray-800 rounded-md w-full pointer-events-auto focus:outline-none font-semibold tracking-wider"
                    contentEditable="false"
                    type={`${isPasswordVisible[index] ? "text" : "password"}`}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
