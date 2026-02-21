import fs from "fs";

const url = "https://www.netflix.com/account/travel/verify?nftoken=BgjStOvcAxKkAXIpJUel9SZC05SY5z1xZmtVWn3ueC6suQen1ILN+9o/jOStOnwAaD0sNm2+VshQuC76CgQlVHPUlXB0phK/mJwvm9pwcxsgNnnGrpl80Cs7tId5p6wxKvpAFClbpN5Lv8+ZRPitm5j708zeGN5ZTYhfKL102MpO4Qv+WQJBT6Tnoj70xEpYBWZe8IkUIOmocLOpp/oVAFk07GU+2hSViOnWDfCeGAYiDgoMr91tgzNNpnSGKbsd&messageGuid=4c5d8a5c-9a01-40f2-877a-2834e41df400";

fetch(url)
  .then(res => res.text())
  .then(data => {
    fs.writeFileSync("respuesta.txt", data, "utf8");
    console.log("Respuesta guardada en respuesta.txt");
  })
  .catch(err => {
    console.error("Error:", err);
  });
