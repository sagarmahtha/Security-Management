const scriptURL = "https://script.google.com/macros/s/AKfycbxrpKSu9iCgYyFRkZdKL1-kP1jvIar8Azy3tpyqxgFrjRtgxz05zZ3TtDaslYSrLplkNg/exec";

const form = document.getElementById("guardForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ===== Collect Data =====
  const name = document.getElementById("name").value.trim().toUpperCase();
  const srfid = document.getElementById("srfid").value.trim();
  const nxid = document.getElementById("nxid").value.trim().toUpperCase();
  const rank = document.getElementById("rank").value;
  const mobile = document.getElementById("mobile").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value.trim();

  // ===== Validation =====
  if (!/^[A-Z\s]+$/.test(name)) {
    alert("Name must contain only uppercase letters.");
    return;
  }

  if (!/^\d{6}$/.test(srfid)) {
    alert("SRF ID must be exactly 6 digits.");
    return;
  }

  if (!/^SRF\d{4}$/.test(nxid)) {
    alert("NX ID must start with SRF followed by 4 digits.");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile must be exactly 10 digits.");
    return;
  }

  if (!/^\d{10}$/.test(whatsapp)) {
    alert("WhatsApp must be exactly 10 digits.");
    return;
  }

  const dobDate = new Date(dob);
  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());

  if (dobDate > minAgeDate) {
    alert("Guard must be at least 21 years old.");
    return;
  }

  // ===== Prepare Data =====
  const data = {
    name,
    srfid,
    nxid,
    rank,
    mobile,
    whatsapp,
    dob,
    email
  };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("Guard Registered Successfully!");
      form.reset();
    } 
    else if (result.result === "duplicate") {
      alert("Duplicate Entry! SRF ID, NX ID, or Mobile already exists.");
    } 
    else {
      alert("Server Error. Please try again.");
    }

  } catch (error) {
    console.error(error);
    alert("Network Error. Please check connection.");
  }
});
