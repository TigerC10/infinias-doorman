import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

/**
 * Unlock doors
 * @param options
 * @returns {*|Promise<T>}
 */
export function unlockDoors(options) {
  const unlockFormData = new FormData();
  unlockFormData.append('LockStatus', 'Unlocked');
  unlockFormData.append('DoorIds', options.doorIds);
  unlockFormData.append('Duration', options.duration);
  unlockFormData.append('username', options.infiniasUsername);
  unlockFormData.append('password', options.infiniasPassword);

  // const packetInfo = decoders.ARP(buffer, packet.offset);
  // console.log('from: ' + packetInfo.info.srcaddr + ' to ' + packetInfo.info.dstaddr);
  // console.log('srcmac: ' + packet.info.srcmac);
  // console.log('packetInfo: ', packetInfo);

  return fetch(`${options.infiniasHost}/infinias/ia/Doors`, {
    headers: unlockFormData.getHeaders(),
    method: 'PUT',
    body: unlockFormData,
  }).then(() => {
    console.info('Door Unlocked.');
  }).catch((error) => {
    console.info('Could Not Unlock Door.');
    console.error(error);
  });
}
