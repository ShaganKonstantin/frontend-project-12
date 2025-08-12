import * as Profanity from 'leo-profanity';
import russianDict from 'leo-profanity/dictionary/ru.json';

Profanity.add(russianDict);

export const filterProfanity = (text) => {
  if (Profanity.check(text)) {
    return Profanity.clean(text);
  }
  return text
};

