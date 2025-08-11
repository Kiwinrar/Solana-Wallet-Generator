import { mnemonicToSeedSync } from "bip39";
import nacl from 'tweetnacl';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs from "bs58";

export interface WalletItem {
  publicKey: string;
  privateKey: string;
  walletNo: number;
}

interface inputType{
  seedString: string | null,
  isWalletNo: number,
  setIsWalletNo: React.Dispatch<React.SetStateAction<number>>,
  setIsContent: React.Dispatch<React.SetStateAction<WalletItem[]>>
}
export const AddWalletComponent = (props:inputType) => {
  const generateKeys=()=>{
    if(props.seedString!=null){
      const seed = mnemonicToSeedSync(props.seedString);
      const derivationPath = `m/44'/501'/${props.isWalletNo}'/0'`;
      const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
      const viewableSecret = bs.encode(secret);
      props.setIsWalletNo(c => c + 1);
      const newItems:WalletItem={
        publicKey: publicKey,
        privateKey: viewableSecret,
        walletNo: props.isWalletNo,
      }
      props.setIsContent(c=>[...c, newItems])
    }
  }
  return(
    <>
      <button onClick={generateKeys} className="bg-red-800 px-6 py-4 rounded-lg text-white cursor-pointer hover:scale-103">
        Add Wallet
      </button>
    </>
  )
};
