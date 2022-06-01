import { XCircleIcon } from "@heroicons/react/outline"
import { motion } from "framer-motion"

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
}

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="fixed top-0 left-0 h-full w-full bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

const Modal = ({ handleClose, children, title, Icon }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl flex flex-col justify-start bg-white w-auto mx-6 max-h-[calc(100vh-300px)]  overflow-y-scroll"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
          <div className="flex items-center justify-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            <h4 className="text-xl font-bold">{title}</h4>
          </div>
          <XCircleIcon onClick={handleClose} className="h-7 w-7 cursor-pointer" />
        </div>
        <div className="p-5">{children}</div>
      </motion.div>
    </Backdrop>
  )
}

export default Modal
