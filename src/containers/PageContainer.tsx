import CustomBreadcrumbs from "@components/navigation/CustomBreadcrumbs"
import Layout from "./Layout"
import { CustomButton } from "@components/inputs/CustomButton";
import Title from "@components/display/Title";
import { PageContainerProps } from "@logic/interfaces/ContainerInterface";

const PageContainer = ({ title, rightButton, isLoading = false, mainRoute, primaryRoute, secondaryRoute, children }: PageContainerProps) => {
  return (
    <Layout loading={isLoading}>
      <CustomBreadcrumbs
        mainRoute={mainRoute}
        secondaryRoute={secondaryRoute}
        primaryRoute={primaryRoute}
      />
      <div className="flex flex-row w-full justify-between items-center">
        <Title label={title} size="3xl" />
        {
          rightButton &&
          <CustomButton label={rightButton.label} onClick={rightButton.action} />
        }
      </div>
      {
        children
      }
    </Layout>
  )
}

export default PageContainer