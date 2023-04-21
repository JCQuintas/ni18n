import { Header } from "../components/header";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "ni18n";
import { ni18nConfig } from "../../ni18n.config";

const IndexPage = () => {
  const { t } = useTranslation("home");
  return (
    <>
      <Header />
      <main>
        <h1>{t("title")}</h1>
        <p>{t("content")}</p>
        <p>{t("extraContent")}</p>
      </main>
    </>
  );
};

export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ["home"])),
    },
  };
};

export default IndexPage;
