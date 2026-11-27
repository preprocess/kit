/**
 * Every interface icon, by the name call sites use, drawn from Lucide (ISC).
 *
 * Components import from this module, never from `lucide-react`, so the set
 * stays swappable in one place and every glyph gets the same defaults: 18px,
 * the size call sites were laid out for, and a 1.25 stroke. Explicit `size`
 * and `strokeWidth` props still win.
 */
import {
  ArrowDown as LucideArrowDown,
  ArrowLeft as LucideArrowLeft,
  ArrowRight as LucideArrowRight,
  ArrowUp as LucideArrowUp,
  ArrowUpRight as LucideArrowUpRight,
  BadgeCheck as LucideBadgeCheck,
  Bell as LucideBell,
  BookOpen as LucideBookOpen,
  Bookmark as LucideBookmark,
  Bot as LucideBot,
  Box as LucideBox,
  Braces as LucideBraces,
  Brain as LucideBrain,
  Building2 as LucideBuilding2,
  Calendar as LucideCalendar,
  ChartLine as LucideChartLine,
  Check as LucideCheck,
  ChevronDown as LucideChevronDown,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight,
  ChevronsUpDown as LucideChevronsUpDown,
  Circle as LucideCircle,
  CircleAlert as LucideCircleAlert,
  CircleCheck as LucideCircleCheck,
  CircleHelp as LucideCircleHelp,
  CircleX as LucideCircleX,
  Clock as LucideClock,
  Code as LucideCode,
  Cog as LucideCog,
  Coins as LucideCoins,
  Columns2 as LucideColumns2,
  Compass as LucideCompass,
  Copy as LucideCopy,
  CornerDownLeft as LucideCornerDownLeft,
  CornerDownRight as LucideCornerDownRight,
  Cpu as LucideCpu,
  Download as LucideDownload,
  Ellipsis as LucideEllipsis,
  EllipsisVertical as LucideEllipsisVertical,
  Eye as LucideEye,
  EyeOff as LucideEyeOff,
  File as LucideFile,
  FileText as LucideFileText,
  Folder as LucideFolder,
  Funnel as LucideFunnel,
  Gauge as LucideGauge,
  Globe as LucideGlobe,
  Handshake as LucideHandshake,
  Hash as LucideHash,
  Headset as LucideHeadset,
  Heart as LucideHeart,
  History as LucideHistory,
  House as LucideHouse,
  Image as LucideImage,
  Inbox as LucideInbox,
  Info as LucideInfo,
  Library as LucideLibrary,
  Lightbulb as LucideLightbulb,
  Link as LucideLink,
  ListChecks as LucideListChecks,
  Loader as LucideLoader,
  Lock as LucideLock,
  LogOut as LucideLogOut,
  Mail as LucideMail,
  Megaphone as LucideMegaphone,
  Menu as LucideMenu,
  MessageCircle as LucideMessageCircle,
  Minus as LucideMinus,
  Monitor as LucideMonitor,
  Moon as LucideMoon,
  Newspaper as LucideNewspaper,
  OctagonAlert as LucideOctagonAlert,
  Orbit as LucideOrbit,
  Paintbrush as LucidePaintbrush,
  Palette as LucidePalette,
  PanelLeft as LucidePanelLeft,
  PanelRight as LucidePanelRight,
  Pause as LucidePause,
  Pencil as LucidePencil,
  Pipette as LucidePipette,
  Play as LucidePlay,
  Plug as LucidePlug,
  Plus as LucidePlus,
  Radar as LucideRadar,
  RectangleHorizontal as LucideRectangleHorizontal,
  Redo2 as LucideRedo2,
  Rocket as LucideRocket,
  RotateCcw as LucideRotateCcw,
  Scale as LucideScale,
  Scaling as LucideScaling,
  ScanText as LucideScanText,
  Search as LucideSearch,
  Send as LucideSend,
  Server as LucideServer,
  Settings as LucideSettings,
  Shield as LucideShield,
  ShoppingCart as LucideShoppingCart,
  SkipForward as LucideSkipForward,
  SlidersHorizontal as LucideSlidersHorizontal,
  SquareArrowOutUpRight as LucideSquareArrowOutUpRight,
  Star as LucideStar,
  Sun as LucideSun,
  Tags as LucideTags,
  Terminal as LucideTerminal,
  TextAlignStart as LucideTextAlignStart,
  ThumbsDown as LucideThumbsDown,
  ThumbsUp as LucideThumbsUp,
  TrendingUp as LucideTrendingUp,
  TriangleAlert as LucideTriangleAlert,
  User as LucideUser,
  Users as LucideUsers,
  Wrench as LucideWrench,
  X as LucideX,
  createLucideIcon,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement } from "react";

export const ICON_SIZE = 18;
export const ICON_STROKE_WIDTH = 1.25;

/**
 * Collapsed side panels: Lucide's panel frame with a short handle inset from
 * the panel's edge, where `PanelLeft` and `PanelRight` draw a full-height
 * divider for the open panel.
 */
const PanelLeftInset = createLucideIcon("panel-left-inset", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "frame" },
  ],
  ["path", { d: "M7 8v8", key: "handle" }],
]);

const PanelRightInset = createLucideIcon("panel-right-inset", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "frame" },
  ],
  ["path", { d: "M17 8v8", key: "handle" }],
]);

function icon(glyph: LucideIcon) {
  function Icon(props: LucideProps) {
    return createElement(glyph, {
      size: ICON_SIZE,
      strokeWidth: ICON_STROKE_WIDTH,
      ...props,
    });
  }
  Icon.displayName = glyph.displayName;
  return Icon;
}

export const AiDeveloper = icon(LucideBot);
export const ArrowDownIcon = icon(LucideArrowDown);
export const ArrowLeft = icon(LucideArrowLeft);
export const ArrowRight = icon(LucideArrowRight);
export const ArrowUp = icon(LucideArrowUp);
export const ArrowUpRight = icon(LucideArrowUpRight);
export const BadgeCheck = icon(LucideBadgeCheck);
export const Bell = icon(LucideBell);
export const BookOpen = icon(LucideBookOpen);
export const Bookmark = icon(LucideBookmark);
export const Box = icon(LucideBox);
export const Braces = icon(LucideBraces);
export const Brain = icon(LucideBrain);
export const Calendar = icon(LucideCalendar);
export const ChartLine = icon(LucideChartLine);
export const Check = icon(LucideCheck);
export const CheckIcon = icon(LucideCheck);
export const ChevronDown = icon(LucideChevronDown);
export const ChevronDownIcon = icon(LucideChevronDown);
export const ChevronLeftIcon = icon(LucideChevronLeft);
export const ChevronRight = icon(LucideChevronRight);
export const ChevronRightIcon = icon(LucideChevronRight);
export const ChevronsUpDown = icon(LucideChevronsUpDown);
export const Circle = icon(LucideCircle);
export const CircleAlert = icon(LucideCircleAlert);
export const CircleCheckIcon = icon(LucideCircleCheck);
export const CircleHelp = icon(LucideCircleHelp);
export const Clock = icon(LucideClock);
export const Code = icon(LucideCode);
export const Cog = icon(LucideCog);
export const Coins = icon(LucideCoins);
export const Compass = icon(LucideCompass);
export const Copy = icon(LucideCopy);
export const CornerDownLeft = icon(LucideCornerDownLeft);
export const CornerDownRight = icon(LucideCornerDownRight);
export const Cpu = icon(LucideCpu);
export const Dot = icon(LucideCircle);
export const DownloadIcon = icon(LucideDownload);
export const Eye = icon(LucideEye);
export const EyeSlash = icon(LucideEyeOff);
export const FileIcon = icon(LucideFile);
export const FileText = icon(LucideFileText);
export const FilterIcon = icon(LucideFunnel);
export const Folder4 = icon(LucideFolder);
export const Gauge = icon(LucideGauge);
export const Globe = icon(LucideGlobe);
export const Handshake = icon(LucideHandshake);
export const Hash = icon(LucideHash);
export const Headset = icon(LucideHeadset);
export const Heart = icon(LucideHeart);
export const History = icon(LucideHistory);
export const Home = icon(LucideHouse);
export const ImageIcon = icon(LucideImage);
export const Inbox = icon(LucideInbox);
export const InfoIcon = icon(LucideInfo);
export const LayoutLeftIcon = icon(PanelLeftInset);
export const LayoutRightIcon = icon(PanelRightInset);
export const Lightbulb = icon(LucideLightbulb);
export const Link = icon(LucideLink);
export const ListIcon = icon(LucideListChecks);
export const Loader = icon(LucideLoader);
export const Loader2Icon = icon(LucideLoader);
export const Lock = icon(LucideLock);
export const Mail = icon(LucideMail);
export const Megaphone = icon(LucideMegaphone);
export const Menu = icon(LucideMenu);
export const MessageCircle = icon(LucideMessageCircle);
export const MinusIcon = icon(LucideMinus);
export const Monitor = icon(LucideMonitor);
export const Moon = icon(LucideMoon);
export const MoreHorizontalIcon = icon(LucideEllipsis);
export const MoreVerticalIcon = icon(LucideEllipsisVertical);
export const Newspaper = icon(LucideNewspaper);
export const OctagonAlert = icon(LucideOctagonAlert);
export const OctagonXIcon = icon(LucideCircleX);
export const Office = icon(LucideBuilding2);
export const OpenRectArrowOut = icon(LucideLogOut);
export const OrbitSparkle = icon(LucideOrbit);
export const Paintbrush = icon(LucidePaintbrush);
export const Palette = icon(LucidePalette);
export const Pause = icon(LucidePause);
export const Pencil = icon(LucidePencil);
export const Pipette = icon(LucidePipette);
export const Play = icon(LucidePlay);
export const Plug = icon(LucidePlug);
export const Plus = icon(LucidePlus);
export const Radar = icon(LucideRadar);
export const RectangleHorizontal = icon(LucideRectangleHorizontal);
export const Redo3 = icon(LucideRedo2);
export const Rocket = icon(LucideRocket);
export const RotateCcw = icon(LucideRotateCcw);
export const Scale = icon(LucideScale);
export const Scaling = icon(LucideScaling);
export const ScanText = icon(LucideScanText);
export const Search = icon(LucideSearch);
export const SearchIcon = icon(LucideSearch);
export const Send = icon(LucideSend);
export const Server = icon(LucideServer);
export const Settings = icon(LucideSettings);
export const ShareUpRight = icon(LucideSquareArrowOutUpRight);
export const Shield = icon(LucideShield);
export const ShoppingCart = icon(LucideShoppingCart);
export const SidebarLeftIcon = icon(LucidePanelLeft);
export const SidebarRightIcon = icon(LucidePanelRight);
export const SkipForward = icon(LucideSkipForward);
export const SlidersHorizontal = icon(LucideSlidersHorizontal);
export const SplitViewIcon = icon(LucideColumns2);
export const SquareLibrary = icon(LucideLibrary);
export const Star = icon(LucideStar);
export const Sun = icon(LucideSun);
export const Tags = icon(LucideTags);
export const Terminal = icon(LucideTerminal);
export const TextAlignStart = icon(LucideTextAlignStart);
export const ThumbsDown = icon(LucideThumbsDown);
export const ThumbsUp = icon(LucideThumbsUp);
export const TrendingUp = icon(LucideTrendingUp);
export const TriangleAlertIcon = icon(LucideTriangleAlert);
export const User = icon(LucideUser);
export const Users = icon(LucideUsers);
export const WrenchScrewdriver = icon(LucideWrench);
export const X = icon(LucideX);
export const XIcon = icon(LucideX);
