import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/vi";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/vi";

import LanguageUtils from "../utils/LanguageUtils";

const messages = LanguageUtils.getFlattenedMessages();

const IntlProviderWrapper = (props) => {
  const { children } = props;
  const language = useSelector((state) => state.app.language);
  console.log("check languages: ", language);
  console.log("check props: ", props);

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      defaultLocale="vi"
    >
      {children}
    </IntlProvider>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//   };
// };

export default IntlProviderWrapper;
