import HomePageOne from "@pages/business/dashboard/HomePageOne";
import HomePageTwo from "@pages/business/dashboard/HomePageTwo";
import HomePageThree from "@pages/business/dashboard/HomePageThree";
import HomePageFour from "@pages/business/dashboard/HomePageFour";
import HomePageFive from "@pages/business/dashboard/HomePageFive";
import HomePageSix from "@pages/business/dashboard/HomePageSix";
import HomePageSeven from "@pages/business/dashboard/HomePageSeven";
import EmailPage from "@pages/business/dashboard/EmailPage";
import AddUserPage from "@pages/business/dashboard/AddUserPage";
import AlertPage from "@pages/business/dashboard/AlertPage";
import AssignRolePage from "@pages/business/dashboard/AssignRolePage";
import AvatarPage from "@pages/business/dashboard/AvatarPage";
import BadgesPage from "@pages/business/dashboard/BadgesPage";
import ButtonPage from "@pages/business/dashboard/ButtonPage";
import CalendarMainPage from "@pages/business/dashboard/CalendarMainPage";
import CardPage from "@pages/business/dashboard/CardPage";
import CarouselPage from "@pages/business/dashboard/CarouselPage";
import ChatEmptyPage from "@pages/business/dashboard/ChatEmptyPage";
import ChatMessagePage from "@pages/business/dashboard/ChatMessagePage";
import ChatProfilePage from "@pages/business/dashboard/ChatProfilePage";
import CodeGeneratorNewPage from "@pages/business/dashboard/CodeGeneratorNewPage";
import CodeGeneratorPage from "@pages/business/dashboard/CodeGeneratorPage";
import ColorsPage from "@pages/business/dashboard/ColorsPage";
import ColumnChartPage from "@pages/business/dashboard/ColumnChartPage";
import CompanyPage from "@pages/business/dashboard/CompanyPage";
import CurrenciesPage from "@pages/business/dashboard/CurrenciesPage";
import DropdownPage from "@pages/business/dashboard/DropdownPage";

import FaqPage from "@pages/business/dashboard/FaqPage";
import ForgotPasswordPage from "@pages/business/dashboard/ForgotPasswordPage";
import FormLayoutPage from "@pages/business/dashboard/FormLayoutPage";
import FormValidationPage from "@pages/business/dashboard/FormValidationPage";
import FormPage from "@pages/business/dashboard/FormPage";
import GalleryPage from "@pages/business/dashboard/GalleryPage";
import ImageGeneratorPage from "@pages/business/dashboard/ImageGeneratorPage";
import ImageUploadPage from "@pages/business/dashboard/ImageUploadPage";
import InvoiceAddPage from "@pages/business/dashboard/InvoiceAddPage";
import InvoiceEditPage from "@pages/business/dashboard/InvoiceEditPage";
import InvoiceListPage from "@pages/business/dashboard/InvoiceListPage";
import InvoicePreviewPage from "@pages/business/dashboard/InvoicePreviewPage";
import KanbanPage from "@pages/business/dashboard/KanbanPage";
import LanguagePage from "@pages/business/dashboard/LanguagePage";
import LineChartPage from "@pages/business/dashboard/LineChartPage";
import ListPage from "@pages/business/dashboard/ListPage";
import MarketplaceDetailsPage from "@pages/business/dashboard/MarketplaceDetailsPage";
import MarketplacePage from "@pages/business/dashboard/MarketplacePage";
import NotificationAlertPage from "@pages/business/dashboard/NotificationAlertPage";
import NotificationPage from "@pages/business/dashboard/NotificationPage";
import PaginationPage from "@pages/business/dashboard/PaginationPage";
import PaymentGatewayPage from "@pages/business/dashboard/PaymentGatewayPage";
import PieChartPage from "@pages/business/dashboard/PieChartPage";
import PortfolioPage from "@pages/business/dashboard/PortfolioPage";
import PricingPage from "@pages/business/dashboard/PricingPage";
import ProgressPage from "@pages/business/dashboard/ProgressPage";
import RadioPage from "@pages/business/dashboard/RadioPage";
import RoleAccessPage from "@pages/business/dashboard/RoleAccessPage";
import SignInPage from "@pages/business/dashboard/SignInPage";
import SignUpPage from "@pages/business/dashboard/SignUpPage";
import StarRatingPage from "@pages/business/dashboard/StarRatingPage";
import StarredPage from "@pages/business/dashboard/StarredPage";
import SwitchPage from "@pages/business/dashboard/SwitchPage";
import TableBasicPage from "@pages/business/dashboard/TableBasicPage";
import TableDataPage from "@pages/business/dashboard/TableDataPage";
import TabsPage from "@pages/business/dashboard/TabsPage";
import TagsPage from "@pages/business/dashboard/TagsPage";
import TermsConditionPage from "@pages/business/dashboard/TermsConditionPage";
import TextGeneratorPage from "@pages/business/dashboard/TextGeneratorPage";
import ThemePage from "@pages/business/dashboard/ThemePage";
import TooltipPage from "@pages/business/dashboard/TooltipPage";
import TypographyPage from "@pages/business/dashboard/TypographyPage";
import UsersGridPage from "@pages/business/dashboard/UsersGridPage";
import UsersListPage from "@pages/business/dashboard/UsersListPage";
import ViewDetailsPage from "@pages/business/dashboard/ViewDetailsPage";
import VideoGeneratorPage from "@pages/business/dashboard/VideoGeneratorPage";
import VideosPage from "@pages/business/dashboard/VideosPage";
import ViewProfilePage from "@pages/business/dashboard/ViewProfilePage";
import VoiceGeneratorPage from "@pages/business/dashboard/VoiceGeneratorPage";
import WalletPage from "@pages/business/dashboard/WalletPage";
import WidgetsPage from "@pages/business/dashboard/WidgetsPage";
import WizardPage from "@pages/business/dashboard/WizardPage";
import TextGeneratorNewPage from "@pages/business/dashboard/TextGeneratorNewPage";
import HomePageEight from "@pages/business/dashboard/HomePageEight";
import HomePageNine from "@pages/business/dashboard/HomePageNine";
import HomePageTen from "@pages/business/dashboard/HomePageTen";
import HomePageEleven from "@pages/business/dashboard/HomePageEleven";
import GalleryGridPage from "@pages/business/dashboard/GalleryGridPage";
import GalleryMasonryPage from "@pages/business/dashboard/GalleryMasonryPage";
import GalleryHoverPage from "@pages/business/dashboard/GalleryHoverPage";
import BlogPage from "@pages/business/dashboard/BlogPage";
import BlogDetailsPage from "@pages/business/dashboard/BlogDetailsPage";
import AddBlogPage from "@pages/business/dashboard/AddBlogPage";
import TestimonialsPage from "@pages/business/dashboard/TestimonialsPage";
import ComingSoonPage from "@pages/business/dashboard/ComingSoonPage";
import AccessDeniedPage from "@pages/business/dashboard/AccessDeniedPage";
import MaintenancePage from "@pages/business/dashboard/MaintenancePage";
import BlankPagePage from "@pages/business/dashboard/BlankPagePage";
import BusinessLayout from "@layouts/BusinessLayout";
import TeamMembers from "@pages/business/dashboard/TeamMembers";
import TeamMemberAdd from "@pages/business/dashboard/team/TeamMemberAdd";
import CatelogPage from "@pages/business/dashboard/CatelogPage";
import ServicesMenuPage from "@pages/business/dashboard/servicesMenu/ServicesMenuPage";
import NewServicePage from "@pages/business/dashboard/servicesMenu/NewServicePage";
import CalenderView from "@pages/business/dashboard/calender/calenderView";



const BusinessRoutes = [
  {
    path: "/booking-dashboard",
    elment: <BusinessLayout />,
    children: [
      { path: "", index: true, element: <HomePageOne /> },
      { path: "calender", element: <CalenderView /> },
      { path: "team", element: <TeamMembers /> },
      { path: "team/*", element: <TeamMembers /> },
      { path: "team/team_member_add", element: <TeamMemberAdd /> },
      { path: "team/team_member_add/*", element: <TeamMemberAdd /> },

      { path: "catalogue", element: <CatelogPage /> },
      { path: "catalogue/*", element: <CatelogPage /> },
      { path: "catalogue/services", element: <CatelogPage /> },
      { path: "catalogue/services/*", element: <CatelogPage /> },
      { path: "catalogue/services/all", element: <ServicesMenuPage /> },
      { path: "catalogue/services/all/*", element: <ServicesMenuPage /> },
      { path: "catalogue/services/add", element: <NewServicePage /> },
      { path: "catalogue/services/add/*", element: <NewServicePage /> },


      { path: "index-2", element: <HomePageTwo /> },
      { path: "index-3", element: <HomePageThree /> },
      { path: "index-4", element: <HomePageFour /> },
      { path: "index-5", element: <HomePageFive /> },
      { path: "index-6", element: <HomePageSix /> },
      { path: "index-7", element: <HomePageSeven /> },
      { path: "index-8", element: <HomePageEight /> },
      { path: "index-9", element: <HomePageNine /> },
      { path: "index-10", element: <HomePageTen /> },
      { path: "index-11", element: <HomePageEleven /> },
      { path: "add-user", element: <AddUserPage /> },
      { path: "alert", element: <AlertPage /> },
      { path: "assign-role", element: <AssignRolePage /> },
      { path: "avatar", element: <AvatarPage /> },
      { path: "badges", element: <BadgesPage /> },
      { path: "button", element: <ButtonPage /> },
      { path: "calendar-main", element: <CalendarMainPage /> },
      { path: "calendar", element: <CalendarMainPage /> },
      { path: "card", element: <CardPage /> },
      { path: "carousel", element: <CarouselPage /> },
      { path: "chat-empty", element: <ChatEmptyPage /> },
      { path: "chat-message", element: <ChatMessagePage /> },
      { path: "chat-profile", element: <ChatProfilePage /> },
      { path: "code-generator", element: <CodeGeneratorPage /> },
      { path: "code-generator-new", element: <CodeGeneratorNewPage /> },
      { path: "colors", element: <ColorsPage /> },
      { path: "column-chart", element: <ColumnChartPage /> },
      { path: "company", element: <CompanyPage /> },
      { path: "currencies", element: <CurrenciesPage /> },
      { path: "dropdown", element: <DropdownPage /> },
      { path: "email", element: <EmailPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "form-layout", element: <FormLayoutPage /> },
      { path: "form-validation", element: <FormValidationPage /> },
      { path: "form", element: <FormPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "gallery-grid", element: <GalleryGridPage /> },
      { path: "gallery-masonry", element: <GalleryMasonryPage /> },
      { path: "gallery-hover", element: <GalleryHoverPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog-details", element: <BlogDetailsPage /> },
      { path: "add-blog", element: <AddBlogPage /> },
      { path: "testimonials", element: <TestimonialsPage /> },
      { path: "coming-soon", element: <ComingSoonPage /> },
      { path: "access-denied", element: <AccessDeniedPage /> },
      { path: "maintenance", element: <MaintenancePage /> },
      { path: "blank-page", element: <BlankPagePage /> },
      { path: "image-generator", element: <ImageGeneratorPage /> },
      { path: "image-upload", element: <ImageUploadPage /> },
      { path: "invoice-add", element: <InvoiceAddPage /> },
      { path: "invoice-edit", element: <InvoiceEditPage /> },
      { path: "invoice-list", element: <InvoiceListPage /> },
      { path: "invoice-preview", element: <InvoicePreviewPage /> },
      { path: "kanban", element: <KanbanPage /> },
      { path: "language", element: <LanguagePage /> },
      { path: "line-chart", element: <LineChartPage /> },
      { path: "list", element: <ListPage /> },
      { path: "marketplace-details", element: <MarketplaceDetailsPage /> },
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "notification-alert", element: <NotificationAlertPage /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "pagination", element: <PaginationPage /> },
      { path: "payment-gateway", element: <PaymentGatewayPage /> },
      { path: "pie-chart", element: <PieChartPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "radio", element: <RadioPage /> },
      { path: "role-access", element: <RoleAccessPage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "star-rating", element: <StarRatingPage /> },
      { path: "starred", element: <StarredPage /> },
      { path: "switch", element: <SwitchPage /> },
      { path: "table-basic", element: <TableBasicPage /> },
      { path: "table-data", element: <TableDataPage /> },
      { path: "tabs", element: <TabsPage /> },
      { path: "tags", element: <TagsPage /> },
      { path: "terms-condition", element: <TermsConditionPage /> },
      { path: "text-generator-new", element: <TextGeneratorNewPage /> },
      { path: "text-generator", element: <TextGeneratorPage /> },
      { path: "theme", element: <ThemePage /> },
      { path: "tooltip", element: <TooltipPage /> },
      { path: "typography", element: <TypographyPage /> },
      { path: "users-grid", element: <UsersGridPage /> },
      { path: "users-list", element: <UsersListPage /> },
      { path: "view-details", element: <ViewDetailsPage /> },
      { path: "video-generator", element: <VideoGeneratorPage /> },
      { path: "videos", element: <VideosPage /> },
      { path: "view-profile", element: <ViewProfilePage /> },
      { path: "voice-generator", element: <VoiceGeneratorPage /> },
      { path: "wallet", element: <WalletPage /> },
      { path: "widgets", element: <WidgetsPage /> },
      { path: "wizard", element: <WizardPage /> },
    ],
  },
];

export default BusinessRoutes;
