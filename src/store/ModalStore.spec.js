import { ModalStore } from './ModalStore'
import MODALS from 'helpers/modals'

describe('ModalStore', function () {
  let modalStore

  beforeEach(function () {
    modalStore = ModalStore.create()
  })

  it('should exist', function () {
    expect(modalStore).toBeDefined()
  })

  it('should toggle the modal', function () {
    modalStore.toggleModal(MODALS.SEARCH)
    expect(modalStore.current).toBe(MODALS.SEARCH)
  })
})
