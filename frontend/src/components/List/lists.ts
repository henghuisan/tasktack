import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InboxIcon from '@mui/icons-material/Inbox';
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import NotesIcon from "@mui/icons-material/Notes";
import red from "@mui/material/colors/red";
import yellow from "@mui/material/colors/yellow";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import { MenuListItem, PrioriyListItem } from "../../app/interfaces";


export const ListAFromSidebar: MenuListItem[] = [
  {
    title: "Task",
    key: "task",
    icon: CheckBoxIcon,
  },
  {
    title: "Calendar",
    key: "calendar",
    icon: CalendarMonthIcon,
  },
  {
    title: "Search",
    key: "search",
    icon: SearchIcon,
  },
];

export const ListBFromSidebar: MenuListItem[] = [
  {
    title: "Notification",
    key: "notification",
    icon: NotificationsIcon,
  },
  {
    title: "More",
    key: "more",
    icon: HelpIcon,
  },
];

export const ListAFromMenu: MenuListItem[] = [
  {
    title: "All",
    key: "all",
    icon: EventNoteIcon,
  },
  {
    title: "Today",
    key: "today",
    icon: CalendarTodayIcon,
  },
  {
    title: "Next 7 Days",
    key: "week",
    icon: EventNoteIcon,
  },
  {
    title: "Inbox",
    key: "inbox",
    icon: InboxIcon,
  },
];


export const ListBFromMenu: MenuListItem[] = [
  {
    title: "Work",
    key: "work",
    icon: WorkIcon,
  },
  {
    title: "Personal",
    key: "personal",
    icon: HomeIcon,
  },
  {
    title: "Learning",
    key: "learning",
    icon: SchoolIcon,
  },
  {
    title: "Shopping",
    key: "shopping",
    icon: ShoppingCartIcon,
  },
  {
    title: "Fitness",
    key: "fitness",
    icon: FitnessCenterIcon,
  },
  {
    title: "Wish List",
    key: "wishlist",
    icon: CardGiftcardIcon,
  },
];

export const ListCFromMenu: MenuListItem[] = [
  {
    title: "Completed",
    key: "completed",
    icon: CheckBoxIcon,
  },
  // {
  //   title: "Trash",
  //   key: "trash",
  //   icon: RestoreFromTrashIcon,
  // },
  {
    title: "Summary",
    key: "summary",
    icon: NotesIcon,
  },
];

export const PriorityList: PrioriyListItem[] = [
  {
    name: "High",
    key: "high",
    color: red[500],
  },
  {
    name: "Medium",
    key: "medium",
    color: yellow[700],
  },
  {
    name: "Low",
    key: "low",
    color: blue[600],
  },
  {
    name: "None",
    key: "none",
    color: grey[500],
  }
]