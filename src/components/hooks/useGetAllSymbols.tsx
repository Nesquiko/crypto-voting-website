import { ContractCall, useContractCall, useEthers } from "@usedapp/core";
import { constants, utils } from "ethers";
import VotingHub from "../../chain-info/contracts/VotingHub.json";
import networkMapping from "../../chain-info/deployments/map.json";

export const useGetAllSymbols = () => {
    const { chainId } = useEthers();
    const { abi } = VotingHub;

    const votingHubAddress = chainId
        ? networkMapping["4"]["VotingHub"][0]
        : constants.AddressZero;

    const votingHubInterface = new utils.Interface(abi);

    const call = {
        abi: votingHubInterface,
        address: votingHubAddress,
        method: "getAllVotinSessionsSymbols",
        args: [],
    } as ContractCall;

    const symbols = useContractCall(call);
    return symbols;
};
