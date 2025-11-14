import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function PostBody({body,image,createdAt}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
 <>
  <div>
 {body && <p className="text-black dark:text-white block text-xl leading-snug mt-3 ">{body?.length >40 ? body.substring(0,50)+ "...":
    body}</p>  }
{image &&
    <img onClick={onOpen} className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 w-full h-64 object-cover object-center cursor-pointer " src={image} />

}
   
    <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{createdAt?.split(".",1).join().replace('T',"  . ")}</p>



     <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sky-600 text-2xl">Post content </ModalHeader>
              <ModalBody>
                 <p className="text-black dark:text-white block text-xl leading-snug">{body?.length >40 ? body.substring(0,50)+ "...": body}</p>
               {
                image && <img onClick={onClose} className="mt-2 rounded-2xl border border-gray-100 h-64 dark:border-gray-700 w-full  object-contain object-center cursor-pointer " src={image} />
               }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
 
 
 </>
  )
}
