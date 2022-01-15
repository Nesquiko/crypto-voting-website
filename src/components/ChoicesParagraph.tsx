import { ethers, utils } from "ethers";
import VotingHub from "../chain-info/contracts/VotingHub.json";
import VotingSession from "../chain-info/contracts/VotingSession.json";
import networkMapping from "../chain-info/deployments/map.json";

export const getAllChoicesForSymbol = async (
    symbol: string,
    handleZeroAddress: () => void
) => {
    const { abi: hubAbi } = VotingHub;
    const { abi: sessionAbi } = VotingSession;
    const votingHubAddress = networkMapping["4"]["VotingHub"][0];

    const votingHubInterface = new utils.Interface(hubAbi);
    var provider = ethers.providers.getDefaultProvider("rinkeby");

    const hub = new ethers.Contract(
        votingHubAddress,
        votingHubInterface,
        provider
    );

    const address = await hub.addressesOfVotingSessions(symbol);

    if (address == ethers.constants.AddressZero) {
        handleZeroAddress();
    }
    const votingSessionInterface = new utils.Interface(sessionAbi);
    const session = new ethers.Contract(
        address,
        votingSessionInterface,
        provider
    );
    const choices = await session.getAllChoices();
    return choices;
};
