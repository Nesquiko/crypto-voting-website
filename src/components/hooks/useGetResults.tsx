import { ContractCall, useContractCall } from "@usedapp/core";
import { utils } from "ethers";
import VotingSession from "../../chain-info/contracts/VotingSession.json";

export const useGerResults = (sessionAddress: string) => {
    const { abi } = VotingSession;
    const votingSessionInterface = new utils.Interface(abi);

    const call = {
        abi: votingSessionInterface,
        address: sessionAddress,
        method: "getResults",
        args: [],
    } as ContractCall;

    const results = useContractCall(call);
    return results;
};
