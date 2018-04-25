import { Cap, decoders } from 'cap';

import { unlockDoors } from '../infiniasAccessControlClient';

const { PROTOCOL } = decoders;

/**
 * Setup the dash button listeners
 * @param config
 * @returns {Cap}
 */
function setupDashButtonTrigger(config) {

  const c = new Cap();
  // console.dir(Cap.deviceList());
  let device = null;
  if (config.dashConfig && config.dashConfig.device) {
    device = config.dashConfig.device; // eslint-disable-line prefer-destructuring
  } else {
    device = Cap.findDevice();
  }
  // console.dir(device);
  // console.log('type', typeof device);

  const buttonList = Object.keys(config.dashConfig.buttons);

  const filter = 'arp';
  const bufSize = 10 * 1024 * 1024;
  const buffer = Buffer.alloc(65535);

  const linkType = c.open(device, filter, bufSize, buffer);

  if (c.setMinBytes) {
    c.setMinBytes(0);
  }

  c.on('packet', () => {
    if (linkType === 'ETHERNET') {
      const packet = decoders.Ethernet(buffer);

      if (packet.info.type === PROTOCOL.ETHERNET.ARP && buttonList.indexOf(packet.info.srcmac) !== -1) {
        const buttonConfig = config.dashConfig.buttons[packet.info.srcmac];

        unlockDoors({
          doorIds: buttonConfig.doorIds,
          duration: buttonConfig.duration,
          infiniasHost: config.infiniasHost,
          infiniasUsername: config.infiniasUsername,
          infiniasPassword: config.infiniasPassword,
        });
      }
    }
  });

  console.info('Doorman service listening for dash buttons.');

  return c;
}

export default setupDashButtonTrigger;
