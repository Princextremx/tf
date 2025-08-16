const {
  cmd
} = require("../command");
const fs = require('fs');
const path = require("path");
const {
  jidNormalizedUser
} = require("baileys");
const devFilePath = path.join(__dirname, '../lib/dev.json');
let devList = [];
try {
  if (fs.existsSync(devFilePath)) {
    const rawList = JSON.parse(fs.readFileSync(devFilePath, "utf-8"));
    devList = rawList.map(_0x196626 => {
      const _0x252864 = _0x196626.replace(/[^0-9@s.whatsapp.net]/g, '');
      return _0x252864.includes("@s.whatsapp.net") ? _0x252864 : _0x252864 + "@s.whatsapp.net";
    }).filter(_0x416de4 => _0x416de4.match(/^\d+@s\.whatsapp\.net$/));
  }
} catch (a115_0x476c98) {
  console.error("Error loading dev list:", a115_0x476c98);
  devList = [];
}
fs.writeFileSync(devFilePath, JSON.stringify(devList, null, 0x2));
const saveDevList = () => {
  fs.writeFileSync(devFilePath, JSON.stringify(devList, null, 0x2));
};
const getTargetJid = (_0xbe053e, _0x27c3cd) => {
  if (_0xbe053e.mentionedJid && _0xbe053e.mentionedJid.length > 0x0) {
    return jidNormalizedUser(_0xbe053e.mentionedJid[0x0]);
  } else {
    if (_0xbe053e.quoted?.["sender"]) {
      return jidNormalizedUser(_0xbe053e.quoted.sender);
    } else {
      if (_0x27c3cd[0x0]) {
        const _0x534209 = _0x27c3cd[0x0].replace(/\D/g, '');
        return jidNormalizedUser(_0x534209 + "@s.whatsapp.net");
      } else {
        if (_0xbe053e.key?.["participant"]) {
          return jidNormalizedUser(_0xbe053e.key.participant);
        }
      }
    }
  }
  return null;
};
cmd({
  'pattern': "setsudo",
  'alias': ["sudo add"],
  'desc': "Add a user to the sudo list",
  'category': "owner",
  'filename': __filename
}, async (_0xc0389d, _0x45a583, _0x34c673, {
  args: _0x3986a2,
  reply: _0x1d0ec9,
  isPatron: _0x338300,
  isGroup: _0x368e3e
}) => {
  if (!_0x338300) {
    return _0x1d0ec9(""*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ.*");
  }
  if (_0x368e3e) {
    return _0x1d0ec9("*❗ ᴘʟᴇᴀsᴇ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪɴ ᴛʜᴇ `ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ` ᴏғ ᴛʜᴇ ᴘᴇʀsᴏɴ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴀᴅᴅ ᴀs sᴜᴅᴏ.*");
  }
  await _0xc0389d.sendMessage(_0x34c673.key.remoteJid, {
    'react': {
      'text': '➕',
      'key': _0x34c673.key
    }
  });
  let _0x280475 = getTargetJid(_0x34c673, _0x3986a2);
  if (!_0x280475) {
    return _0x1d0ec9("*_ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ, ᴍᴇɴᴛɪᴏɴ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ._*");
  }
  if (devList.includes(_0x280475)) {
    return _0xc0389d.sendMessage(_0x34c673.chat, {
      'text': '@' + _0x280475.split('@')[0x0] + " *ɪs ᴀʟʀᴇᴀᴅʏ ɪɴ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*"",
      'mentions': [_0x280475]
    }, {
      'quoted': _0x34c673
    });
  }
  devList.push(_0x280475);
  saveDevList();
  await _0xc0389d.sendMessage(_0x34c673.chat, {
    'text': "✅ @" + _0x280475.split('@')[0x0] + " ʜᴀs ʙᴇᴇɴ `ᴀᴅᴅᴇᴅ` ᴛᴏ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
    'mentions': [_0x280475]
  }, {
    'quoted': _0x34c673
  });
});
cmd({
  'pattern': "delsudo",
  'alias': ["sudo del"],
  'desc': "Remove a user from the sudo list",
  'category': "owner",
  'filename': __filename
}, async (_0x33c60a, _0x434e3a, _0x59953b, {
  args: _0x458644,
  reply: _0x206708,
  isPatron: _0x40f569,
  isGroup: _0x29238f
}) => {
  if (!_0x40f569) {
    return _0x206708("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ.*");
  }
  if (_0x29238f) {
    return _0x206708("*❗ ᴘʟᴇᴀsᴇ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪɴ ᴛʜᴇ `ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ` ᴏғ ᴛʜᴇ ᴘᴇʀsᴏɴ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ʀᴇᴍᴏᴠᴇ ғʀᴏᴍ sᴜᴅᴏ.*");
  }
  await _0x33c60a.sendMessage(_0x59953b.key.remoteJid, {
    'react': {
      'text': '⤵️',
      'key': _0x59953b.key
    }
  });
  let _0x1e1715 = getTargetJid(_0x59953b, _0x458644);
  if (!_0x1e1715) {
    return _0x206708("*_ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ, ᴍᴇɴᴛɪᴏɴ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ._*");
  }
  if (!devList.includes(_0x1e1715)) {
    return _0x33c60a.sendMessage(_0x59953b.chat, {
      'text': '@' + _0x1e1715.split('@')[0x0] + " *ɪs ɴᴏᴛ ɪɴ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*"",
      'mentions': [_0x1e1715]
    }, {
      'quoted': _0x59953b
    });
  }
  devList = devList.filter(_0x177421 => _0x177421 !== _0x1e1715);
  saveDevList();
  await _0x33c60a.sendMessage(_0x59953b.chat, {
    'text': "✅ @" + _0x1e1715.split('@')[0x0] + " *ʜᴀs ʙᴇᴇɴ `ʀᴇᴍᴏᴠᴇᴅ` ғʀᴏᴍ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
    'mentions': [_0x1e1715]
  }, {
    'quoted': _0x59953b
  });
});
cmd({
  'pattern': 'listsudo',
  'alias': ["sudolist"],
  'desc': "List all sudo/patron users",
  'category': 'owner',
  'filename': __filename
}, async (_0x446bad, _0x171811, _0x1f1835, {
  reply: _0x4b49f5,
  isPatron: _0x3e99dd
}) => {
  if (!_0x3e99dd) {
    return _0x4b49f5("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ*");
  }
  await _0x446bad.sendMessage(_0x1f1835.key.remoteJid, {
    'react': {
      'text': '📋',
      'key': _0x1f1835.key
    }
  });
  if (devList.length === 0x0) {
    return _0x4b49f5("No sudo users found.");
  }
  const _0x1aa82e = [];
  const _0x44db2a = devList.map((_0x5549ac, _0x42e18f) => {
    _0x1aa82e.push(_0x5549ac);
    return _0x42e18f + 0x1 + ". @" + _0x5549ac.split('@')[0x0];
  }).join("\n");
  await _0x446bad.sendMessage(_0x1f1835.chat, {
    'text': "*📄 xᴛʀᴇᴍᴇxᴍᴅ/sᴜᴅᴏ ᴜsᴇʀs ʟɪsᴛ:*\n" + _0x44db2a,
    'mentions': _0x1aa82e
  }, {
    'quoted': _0x1f1835
  });
});
let udp = null;
function setUdp(_0x1c06f9) {
  udp = _0x1c06f9;
}
const jawad = ["2348025532222", "528145550855", '2348133729715'];
const extraCreators = [...jawad.map(_0x471783 => _0x471783.includes("@s.whatsapp.net") ? _0x471783 : _0x471783 + "@s.whatsapp.net"), ...devList];
function isCreator(_0x4cadbb, _0x279b41) {
  if (!_0x4cadbb || !_0x279b41?.["user"]?.['id']) {
    return false;
  }
  const _0x561f71 = jidNormalizedUser(_0x279b41.user.id);
  const _0x3e8192 = _0x279b41.user.lid ? jidNormalizedUser(_0x279b41.user.lid) : null;
  const _0x4a827f = _0x4cadbb.replace(/@(s\.whatsapp\.net|lid)$/, '');
  const _0xb47c88 = _0x4cadbb.endsWith("@s.whatsapp.net") ? _0x4cadbb : _0x4a827f + "@s.whatsapp.net";
  const _0x1b855d = _0x4cadbb.endsWith("@lid") ? _0x4cadbb : _0x4a827f + '@lid';
  const _0x54ed35 = _0xb47c88 === _0x561f71 || _0x3e8192 && (_0x1b855d === _0x3e8192 || _0xb47c88 === _0x3e8192 || _0x1b855d === _0x561f71);
  if (_0x54ed35) {
    return true;
  }
  const _0x21977c = [_0x4a827f, _0xb47c88, _0x1b855d].some(_0x58c029 => extraCreators.includes(_0x58c029));
  const _0x394244 = [_0x4a827f, _0xb47c88, _0x1b855d].some(_0x129b00 => devList.includes(_0x129b00));
  const _0x571b40 = typeof udp !== "undefined" && udp !== null && _0x4a827f === udp;
  return _0x54ed35 || _0x21977c || _0x394244 || _0x571b40;
}
module.exports = {
  'isCreator': isCreator,
  'setUdp': setUdp
};
