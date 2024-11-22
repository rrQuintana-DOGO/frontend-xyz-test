import CustomBreadcrumbs from "@components/navigation/CustomBreadcrumbs"
import { CustomButton } from "@components/inputs/CustomButton";
import Title from "@components/display/Title";
import { PageContainerWithSideBarProps } from "@logic/interfaces/ContainerInterface";
import LayoutWithSideBar from "@containers/LayoutWithSideBar";

const PageContainerWithSideBar = (
  { title, 
    rightButton, 
    isLoading = false, 
    mainRoute, 
    primaryRoute, 
    secondaryRoute, 
    children,
    sideBarItems
  }: PageContainerWithSideBarProps) => {
  return (
    <LayoutWithSideBar 
      sideBarItems={sideBarItems}
      loading={isLoading}
    >
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
    </LayoutWithSideBar>
  )
}

export default PageContainerWithSideBar