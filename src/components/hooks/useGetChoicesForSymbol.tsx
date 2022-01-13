import { ContractCall, useContractCall } from "@usedapp/core";
import { constants, utils } from "ethers";
import VotingSession from "../../chain-info/contracts/VotingSession.json";
import { useGetAddressOfSymbol } from "./useGetAddressOfSymbol";

export const useGetChoicesForSymbol = (symbol: string) => {
    const { abi } = VotingSession;
    const address = useGetAddressOfSymbol(symbol);

    const votinsSessionInterface = new utils.Interface(abi);
    const votingSessionAddress = address ? address[0] : constants.AddressZero;

    const call = {
        abi: votinsSessionInterface,
        address: votingSessionAddress,
        method: "getAllChoices",
        args: [],
    } as ContractCall;

    const choices = useContractCall(call);
    return choices;
};
