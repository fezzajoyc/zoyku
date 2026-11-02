import passwordGenerator from "./password-generator";
import passwordStrength from "./password-strength";
import emailValidator from "./email-validator";
import dnsLookup from "./dns-lookup";
import ipLookup from "./ip-lookup";
import whoisLookup from "./whois-lookup";
import randomNumber from "./random-number";
import totpGenerator from "./totp-generator";

export const SECURITY_TOOLS = [
  passwordGenerator,
  passwordStrength,
  emailValidator,
  dnsLookup,
  ipLookup,
  whoisLookup,
  randomNumber,
  totpGenerator,
];
