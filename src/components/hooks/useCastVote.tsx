import { useContractFunction } from "@usedapp/core";
import { Contract, utils } from "ethers";
import VotingSession from "../../chain-info/contracts/VotingSession.json";
import { getAddress } from "../getAddressOfSymbol";

export const useCastVote = (address: string) => {
    const { abi } = VotingSession;
    const votingSessionInterface = new utils.Interface(abi);
    const votingSessionContract = new Contract(address, votingSessionInterface);

    const { send: castVoteSend, state: castVoteState } = useContractFunction(
        votingSessionContract,
        "vote",
        {
            transactionName: "Cast vote",
        }
    );

    const castVote = (choice: string, numOfVotes: number) => {
        return castVoteSend(choice, numOfVotes);
    };
    return { castVote, castVoteState };
};
