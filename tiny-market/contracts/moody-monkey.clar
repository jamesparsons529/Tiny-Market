;; title: sip009-nft
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)


;; token definitions
;;
(define-non-fungible-token moody-monkey uint) ;; Defines new NFT

;; constants
;;
(define-constant contract-owner 'ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH) ;; Contract owner's principal
(define-constant mint-cost u500000) ;; 0.5 STX in microSTX (1 STX = 1,000,000 microSTX)

;; error codes
(define-constant err-owner-only (err u100)) 
(define-constant err-token-id-failure (err u101))
(define-constant err-not-token-owner (err u102)) 

;; data vars
(define-data-var last-token-id uint u0) ;; highest token ID

(define-data-var token-hash (string-ascii 100) "QmZK8gsvJiKPKi2zBVmhJgx8Lfx8LH8f1xpU4mEwYqAfLu") ;; IPFS hash

;; read only functions
;;
(define-read-only (get-last-token-id) ;; Function to track last token ID
    (ok (var-get last-token-id))
)

(define-read-only (get-owner (token-id uint)) 
    (ok (nft-get-owner? moody-monkey token-id))
)

(define-read-only (get-token-uri (id uint))
    (ok (some (var-get token-hash)))
)

;; public functions
;;
(define-public (transfer (token-id uint) (sender principal) (recipient principal)) ;; Checks if sender is tx-sender
    (begin 
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (nft-transfer? moody-monkey token-id sender recipient)
    )
) 

(define-public (mint (recipient principal))
    (let (
            (token-id (+ (var-get last-token-id) u1)) ;; sets new token-id to last-token-id + 1
        )
        ;; Ensure that the sender is paying the required minting fee
        (try! (stx-transfer? mint-cost tx-sender contract-owner))
        
        ;; Mint the NFT to the recipient
        (try! (nft-mint? moody-monkey token-id recipient)) 
        
        ;; Update the last token id
        (var-set last-token-id token-id)
        
        ;; Return the newly minted token ID
        (ok token-id)
    )
)
