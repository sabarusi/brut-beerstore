import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";

export default function CustomModal({isOpen, onClose, children}){
    return <Modal size="sm" 
                  isCentered 
                  isOpen={isOpen} 
                  onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader />
                    <ModalBody pt={10} 
                               pb={20} 
                               align="center">
                                       {children}
                    </ModalBody>
                    </ModalContent>
            </Modal>
}