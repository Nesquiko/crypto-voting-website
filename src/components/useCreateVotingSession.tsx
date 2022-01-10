import { useContractFunction, useEthers } from "@usedapp/core";
import { constants, Contract, utils } from "ethers";
import VotingHub from "../chain-info/contracts/VotingHub.json";
import networkMapping from "../chain-info/deployments/map.json";

export const useCreateVotingSession = () => {
    const { chainId } = useEthers();
    const { abi } = VotingHub;

    const votingHubAddress = chainId
        ? networkMapping["4"]["VotingHub"][0]
        : constants.AddressZero;

    const votingHubInterface = new utils.Interface(abi);

    const votingHubContract = new Contract(
        votingHubAddress,
        votingHubInterface
    );

    const { send: createVotingSessionSend, state: createVotingSessionState } =
        useContractFunction(votingHubContract, "createVotingSession", {
            transactionName: "Create Voting Session",
        });

    const createVotingSession = (
        symbol: string,
        start: number,
        end: number,
        numOfVotes: number
    ) => {
        return createVotingSessionSend(symbol, start, end, numOfVotes);
    };

    return { createVotingSession, createVotingSessionState };
};
