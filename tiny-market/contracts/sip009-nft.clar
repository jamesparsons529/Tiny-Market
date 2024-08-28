
;; title: sip009-nft
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)


;; token definitions
;;
(define-non-fungible-token stacksies uint) ;; Defines new NFT

;; constants
;;
(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100)) 
(define-constant err-token-id-failure (err u101))
(define-constant err-not-token-owner (err u102)) 

;; data vars
;;
(define-data-var last-token-id uint u0) ;; highest token ID
(define-constant MINT_PRICE u50000000)

(define-data-var base-uri (string-ascii 100) "storageapi.fleek.co/87ae85d3-6af5-4525-94fc-620cfc39f293-bucket/nft-example/another_ape.json") ;; ipfs://


;; data maps
;;

;; read only functions
;;
(define-read-only (get-last-token-id) ;; Function to track last token ID
    (ok (var-get last-token-id))
)

(define-read-only (get-owner (token-id uint)) 
    (ok (nft-get-owner? stacksies token-id))
)

(define-read-only (get-token-uri (id uint))
 ;;(concat var-get base-uri "{id}" ".json")
  (ok (some (var-get base-uri)))
)

;; public functions
;;
(define-public (transfer (token-id uint) (sender principal) (recipient principal)) ;; Checks if sender is tx-sender
    (begin 
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (nft-transfer? stacksies token-id sender recipient)
    )
) 

(define-public (mint)
  (let 
    (
      (id (+ (var-get last-token-id) u1))
    )
    (try! (stx-transfer? MINT_PRICE tx-sender contract-owner))
    (try! (nft-mint? stacksies id tx-sender))
    (var-set last-token-id id)
    (ok id)
  )
)
;; private functions
;;

