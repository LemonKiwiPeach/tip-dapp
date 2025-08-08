let api;

const walletName = "lace"; // または "eternl", "flint", "nami" など対応ウォレット名に応じて変更

async function connectWallet() {
  if (!window.cardano || !window.cardano[walletName]) {
    alert(`${walletName} wallet not found.`);
    return;
  }

  try {
    const api = await window.cardano[walletName].enable();
    const addresses = await api.getUsedAddresses();
    console.log("Connected:", addresses);
    alert("Wallet connected!");
  } catch (err) {
    console.error(err);
    alert("Failed to connect wallet.");
  }
}


async function sendTip() {
  if (!api) {
    alert("Connect wallet first.");
    return;
  }

  const recipient = "addr1q97eru57xrfr67h0c3rmumdalcdnav2uu0q0hlg6u65dcrf6uuwr4kk3w42w2f8n57v9mtd4lykqedqpv5hxd782veqqae52kx"; // ←自分のアドレスに変更
  const amountLovelace = "1000000"; // 1 ADA = 1,000,000 Lovelace

  try {
    const tx = await api.experimental.send({
      address: recipient,
      amount: amountLovelace,
    });

    console.log("TX Hash:", tx);
    alert("Tip sent! TX: " + tx);
  } catch (err) {
    console.error(err);
    alert("Transaction failed.");
  }
}
